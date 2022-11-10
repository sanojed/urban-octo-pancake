import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Inventory } from '../inventory.model';
import { InventoryService } from '../inventory.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {
  _inventory: Inventory[] = [];
  _myForm: FormGroup;
  constructor(
    private inventory: InventoryService,
    private fb: FormBuilder
  ) {
    this._myForm = this.fb.group({
      id: [{ value: 0, disabled: true }],
      name: ['', Validators.required],
      quantity: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.inventory.get().subscribe(
      resp => {
        this._inventory = resp;
      }, err => {
        alert("error occured");
      }
    )
  }

  OnEdit(inventory: Inventory) {
    this._myForm = this.fb.group({
      id: [{ value: inventory.id, disabled: true }],
      name: [inventory.name, Validators.required],
      quantity: [inventory.quantity, Validators.required]
    })
  }

  OnDelete(id: number) {
    this.inventory.delete(id).subscribe(
      resp => {
        alert("Deleted");
        this._inventory = this._inventory.filter(x => x.id != id);
      }, err => {
        alert("Error occured");
      }
    )
  }

  OnClear() {
    this._myForm.reset();
    this._myForm.controls['id'].setValue(0);
  }

  ngSubmit(data: any) {
    let id = this._myForm.controls['id'].value;
    let inventory: Inventory = { name: data.value?.name, quantity: data.value?.quantity, id: id };

    if (id > 0)
      this.inventory.put(inventory).subscribe(
        resp => {
          let update = this._inventory.find(x => x.id == id);
          if (update != undefined) {
            let index = this._inventory.indexOf(update);
            this._inventory[index] = resp;
          }
          alert("Updated");
          this.OnClear();
        }, err => {
          alert("Error occured");
        }
      )
    else
      this.inventory.post({ ...inventory, id: 0 }).subscribe(
        resp => {
          this._inventory.push({ ...inventory, id: resp.id });
          this.OnClear();
          alert("Added");
        }, err => {
          alert("Error occured");
        }
      )
  }

}
