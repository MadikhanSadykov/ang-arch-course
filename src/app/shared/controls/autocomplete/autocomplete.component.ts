import {Component, EventEmitter, forwardRef, Input, OnDestroy, OnInit, Output} from '@angular/core';
import { ControlItem, Value } from "@app/models/frontend";
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR} from "@angular/forms";
import {distinctUntilChanged, filter, map, Observable, startWith, Subject, takeUntil} from "rxjs";
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

  private destroy = new Subject<void>();

  constructor() {
  }

  private propagateChange: any = () => { };
  private propagateTouched: any = () => { };
  private filter(value: string): ControlItem[] {
    const filterValue = value.toLowerCase();
    return this.items.filter(item => item.label.toLowerCase().includes(filterValue));
  }

  ngOnInit(): void {
    this.options$ = this.formControl.valueChanges.pipe(
      startWith(''),
      filter(value => typeof  value === 'string' || typeof value === 'object'),
      map(value => typeof value === 'string' ?  value : value.label),
      map(label => label ? this.filter(label) : this.items.slice())
    );
    this.formControl.valueChanges.pipe(
      takeUntil(this.destroy),
      distinctUntilChanged()
    ).subscribe(item => {
      const value = typeof item === 'object' ? item.value : null;
      this.propagateChange(value);
      this.changed.emit(value);
    })
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.registerOnTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.formControl.disable();
    } else {
      this.formControl.enable();
    }
  }

  writeValue(value: Value): void {
    const selectedOptions = this.items.find(item => item.value === value);
    this.formControl.setValue(selectedOptions);
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  displayFn(item?: ControlItem): any {
    return item ? item.label : null;
  }

  onBlur(): void {
    this.propagateTouched();
  }

}
