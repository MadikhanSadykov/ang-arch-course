import {Component, EventEmitter, forwardRef, Input, OnInit, Output} from '@angular/core';
import {ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR} from "@angular/forms";

export interface Value {
  form: number,
  to: number
}

export interface Placeholder {
  from: string,
  to: string
}

@Component({
  selector: 'app-date-range',
  templateUrl: './date-range.component.html',
  styleUrls: ['./date-range.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateRangeComponent),
      multi: true
    }
  ]
})
export class DateRangeComponent implements OnInit, ControlValueAccessor {

  @Input() placeholder: Placeholder;
  @Output() changed = new EventEmitter<Value>();

  form: FormGroup;

  constructor(private fb: FormBuilder) {}

  private propagateChange: any = () => { };
  private propagateTouched: any = () => { };

  ngOnInit(): void {
    this.form = this.fb.group({
      from: [null],
      to: [null]
    })
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.propagateTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.form.disable();
    } else {
      this.form.enable();
    }
  }

  writeValue(value: Value): void {
    this.form.patchValue(value || {});
  }

  onChanged(): void {
    const value = {...this.form.value};
    this.propagateChange(value);
    this.changed.emit(value);
  }

  onClosed(): void {
    this.propagateTouched();
  }

  get min(): Date {
    const from = this.form.controls['from'].value;
    return new Date(from);
  }

  get max(): Date {
    const to = this.form.controls['to'].value;
    return new Date(to);
  }

}
