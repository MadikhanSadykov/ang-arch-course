import {Component, EventEmitter, forwardRef, Input, OnInit, Output} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {MatDatepickerInputEvent} from "@angular/material/datepicker";

type Value = number;

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateComponent),
      multi: true
    }
  ]
})
export class DateComponent implements OnInit, ControlValueAccessor {
  @Input() placeholder: string;
  @Input() min: Date;
  @Input() max: Date;
  @Output() changed = new EventEmitter<Value>();
  @Output() closed = new EventEmitter<void>();
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

  onChanged(event: MatDatepickerInputEvent<Date>): void {
    if (event.value) {
      const value: Value = event.value.getTime();
      this.value = value;
      this.propagateChange(value);
      this.changed.emit(value);
    }
  }

  onClosed(): void {
    this.propagateTouched();
    this.closed.emit();
  }

  get inputValue(): Date {
    return new Date(this.value) ;
  }

}
