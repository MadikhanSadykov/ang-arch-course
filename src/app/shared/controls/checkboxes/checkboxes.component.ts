import {Component, EventEmitter, forwardRef, Input, OnInit, Output} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {ControlItem, Value} from "@app/models/frontend";

@Component({
  selector: 'app-checkboxes',
  templateUrl: './checkboxes.component.html',
  styleUrls: ['./checkboxes.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxesComponent),
      multi: true
    }
  ]
})
export class CheckboxesComponent implements OnInit, ControlValueAccessor {
  @Input() items: ControlItem[];
  @Output() changed = new EventEmitter<Value[]>();

  values: Value[];
  isDisabled: boolean;

  constructor() {
  }

  private propagateChange: any = () => { };

  private getSelected(value: Value, checked: boolean): Value[] {
    const selected: Value[] = this.values ? [...this.values] : [];
    if (checked) {
      if (!selected.includes(value)){
        selected.push(value);
      }
    } else {
      const index = selected.indexOf(value);
      selected.splice(index, 1);
    }
    return selected;
  }

  ngOnInit(): void {
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  writeValue(value: Value[]): void {
    this.values = value;
  }

  onChanged(value: Value, event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;
    const selected = this.getSelected(value, isChecked);
    this.values = selected;
    this.propagateChange(selected);
    this.changed.emit(selected);
  }

  isChecked(value: Value): boolean {
    return this.values && this.values.includes(value);
  }

}
