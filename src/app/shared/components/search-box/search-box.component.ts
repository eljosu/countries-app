import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: [
  ]
})
export class SearchBoxComponent implements OnInit, OnDestroy{

  private debouncer: Subject<string> = new Subject<string>();
  private debouncerSuscription?: Subscription;

  @Input()
  public placeholder: string = '';

  @Output()
  public onValue= new EventEmitter<string>();

  @Output()
  public onDebounce= new EventEmitter<string>();

  @Input()
  public initialValue: string = '';

  //debouncetime sirve para marcar el tiempo que va a esperar desde que deja de emitir el observable hasta que se ejecuta el observable
  ngOnInit(): void {
    this.debouncerSuscription= this.debouncer
    .pipe(
      debounceTime(300)
      )
      .subscribe(value => {
        // console.log('debouncer value', value);
        this.onDebounce.emit(value);
      })
    }
    ngOnDestroy(): void {
      this.debouncerSuscription?.unsubscribe();
    }

  emitTxtInput(txt: string): void {
    this.onValue.emit(txt);
  }

  onKeyPress( searchTerm: string ) {
    this.debouncer.next( searchTerm );
  }

}
