import {
  AfterViewInit,
  ContentChild,
  ContentChildren,
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  QueryList
} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {delay, flatMap, map, share, startWith, switchMap, takeUntil, tap} from 'rxjs/operators';
import {fromEvent} from 'rxjs/observable/fromEvent';
import {from} from 'rxjs/observable/from';
import {Observable} from 'rxjs/Observable';
import {merge} from 'rxjs/observable/merge';

@Directive({
  selector: '[appRbSortableList]'
})
export class RbSortableListDirective implements AfterViewInit, OnDestroy {
  @Input('appRbSortableList') list: any[] = [];
  @ContentChildren('sortableItem') sortableItems: QueryList<ElementRef>;
  @ContentChild('dropItem') dropItem: ElementRef;
  @Output() sortChanged = new EventEmitter<any[]>();
  private _eventsSubscriptions: Subscription;
  private _hiddenElementIndex: number;
  private _draggedIndex: number;
  private _elements: any[];

  ngAfterViewInit() {
    const elements$ = this.sortableItems.changes.pipe(
      startWith(this.sortableItems),
      map((items) => items.toArray()),
      map((items) => items.map((item, index) => {
        item.nativeElement.style.order = index + 1;
        return item.nativeElement;
      })),
      tap((items) => this._elements = items)
    );

    const dragStart$ = this._getDragObservable('dragstart').pipe(
      tap((event) => this._draggedIndex = this._elements.indexOf(event.target)),
      delay(0),
      tap((event) => this._handleDragStart(event)),
      share()
    );

    const dragover$ = dragStart$.pipe(
      switchMap(() => this._getDragObservable('dragover')),
      tap((event) => this._handleDragOver(event))
    );

    const drop$ = dragStart$.pipe(
      switchMap(() => fromEvent(this.dropItem.nativeElement, 'dragover')),
      tap((event: DragEvent) => event.preventDefault()),
      switchMap(() => fromEvent(this.dropItem.nativeElement, 'drop')),
      tap(() => this._handleDrop())
    );

    const dragEnd$ = dragStart$.pipe(
      switchMap((event) => fromEvent(event.target, 'dragend').pipe(
        takeUntil(drop$)
      )),
      tap(() => this._handleDragEnd())
    );

    this.dropItem.nativeElement.style.display = 'none';

    this._eventsSubscriptions = merge(elements$, dragStart$, dragover$, drop$, dragEnd$).subscribe();
  }

  ngOnDestroy() {
    this._eventsSubscriptions.unsubscribe();
  }

  private _getDragObservable(event: 'dragstart' | 'dragover'): Observable<DragEvent> {
    return this.sortableItems.changes
      .pipe(
        startWith(this.sortableItems),
        map((items: QueryList<ElementRef>) => items.toArray()),
        switchMap((items: ElementRef[]) => from(items).pipe(
          flatMap((item: ElementRef) => fromEvent(item.nativeElement, event))
        ))
      );
  }

  private _handleDragStart(event) {
    event.target.style.display = 'none';
    this.dropItem.nativeElement.style.order = this._draggedIndex + 1;
    this.dropItem.nativeElement.style.display = '';
    this._hiddenElementIndex = this._draggedIndex;
  }

  private _handleDragOver(event) {
    const index = this._elements.indexOf(event.target);
    if (index === -1 || this._hiddenElementIndex === index) {
      return;
    }
    event.target.style.display = 'none';
    this._elements[this._hiddenElementIndex].style.display = '';
    this.dropItem.nativeElement.style.order = index + 1;
    this._hiddenElementIndex = index;
  }

  private _handleDrop() {
    if (this._draggedIndex === this._hiddenElementIndex) {
      return;
    }
    const withoutDragged = this.list.filter((item, index) => index !== this._draggedIndex);
    const withDragged = [
      ...withoutDragged.slice(0, this._hiddenElementIndex),
      this.list[this._draggedIndex],
      ...withoutDragged.slice(this._hiddenElementIndex)
    ];
    this._handleDragEnd();
    this.sortChanged.emit(withDragged);
  }

  private _handleDragEnd() {
    this.dropItem.nativeElement.style.display = 'none';
    this._elements[this._hiddenElementIndex].style.display = '';
    this._elements[this._draggedIndex].style.display = '';
  }
}
