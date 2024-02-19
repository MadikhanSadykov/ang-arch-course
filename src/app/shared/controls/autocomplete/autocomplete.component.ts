import {Component, EventEmitter, forwardRef, Input, OnDestroy, OnInit, Output} from '@angular/core';
import { ControlItem, Value } from "@app/models/frontend";
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR} from "@angular/forms";
import {Observable, Subject} from "rxjs";
export { ControlItem, Value } from "@app/models/frontend";

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AutocompleteComponent),
      multi: true
    }
  ]
})
export class AutocompleteComponent implements OnInit, OnDestroy, ControlValueAccessor {
  @Input() items: ControlItem[];
  @Input() placeholder: string;

  @Output() changed = new EventEmitter<Value>();

  formControl = new FormControl();
  options$: Observable<ControlItem[]>;

  private destroy = new Subject<any>();

  constructor() {
  }

  ngOnDestroy(): void {
  }

  ngOnInit(): void {
  }

  registerOnChange(fn: any): void {
  }

  registerOnTouched(fn: any): void {
  }

  setDisabledState(isDisabled: boolean): void {
  }

  writeValue(obj: any): void {
  }

  // ngOnDestroy(): void {
  //   this.destroy.next();
  //   this.destroy.complete();
  // }
}
