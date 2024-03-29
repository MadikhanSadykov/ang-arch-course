import {Component, EventEmitter, forwardRef, Input, OnInit, Output} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";

import {ControlItem, Value} from "@app/models/frontend";
import {MatSelectChange, MatSelectModule} from "@angular/material/select";
export {ControlItem, Value} from "@app/models/frontend";

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true
    }
  ]
})
export class SelectComponent implements OnInit, ControlValueAccessor {
  @Input() items: ControlItem[];
  @Input() placeholder: string;
  @Output() changed = new EventEmitter<Value>();

  value: Value;
  isDisabled: boolean;

  constructor() {
  }

  private propagateChange: any = () => { };
  private propagateTouched: any = () => { };

  ngOnInit(): void {
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.propagateTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  writeValue(value: Value): void {
    this.value = value;
  }

  onBlur(): void {
    this.propagateTouched();
  }

  onChanged(event: any): void {
    const value = event.value;
    this.value = value;
    this.propagateChange(value);
    this.changed.emit(value);
  }
}
