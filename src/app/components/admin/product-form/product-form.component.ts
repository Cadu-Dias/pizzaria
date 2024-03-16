import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, WritableSignal, signal } from '@angular/core';
import { Product } from '../../../core/models/interfaces/interfaces';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { v4 as uuid } from 'uuid';
@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss'
})
export class ProductFormComponent implements OnInit {
  pizzaIngredients: string[] = [
    "cheese",
    "tomato sauce",
    "pepperoni",
    "mushrooms",
    "onions",
    "bell peppers",
    "olives",
    "anchovies",
    "sausage",
    "basil",
    "oregano",
    "pineapple",
    "ham",
    "bacon",
    "arugula",
    "sun-dried tomatoes",
    "feta cheese",
    "jalapeños",
    "spinach",
    "artichokes",
    "garlic",
    "chicken",
    "pesto",
    "prosciutto"
  ];

  @Input() showCancelButton : boolean = false;
  @Input() product!: Product;
  @Input({required: true}) buttonText: string = '';
  @Output() formAction: EventEmitter<Product> = new EventEmitter();
  @Output() cancelButton: EventEmitter<void> = new EventEmitter();

  fileName = "";
  selectedIngredients: WritableSignal<string[]> = signal([]);
  productForm! : FormGroup;
  file!: File;
  imageBase64!: string;
  constructor(
    private productFormBuilder: FormBuilder,
    private cd : ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    if(this.product) {
      this.selectedIngredients.set(this.product.ingredients)
    }

    this.productForm = this.productFormBuilder.group({
      name: ["", Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(30),
        Validators.pattern( /(.|\s)*\S(.|\s)*/)
      ])],
      price: ["", Validators.compose([
        Validators.pattern(/^[0-9]+(\.?[0-9]+)?$/),
        Validators.pattern( /(.|\s)*\S(.|\s)*/),
        Validators.minLength(1),
        Validators.maxLength(4)
      ])],
      image: [this.fileName]
    })
  }

  ngAfterViewInit(): void {
    if (this.product) {
      this.productForm.setValue({
        "name": this.product.name,
        "price": this.product.value,
        "image": ""
      })
      
      this.cd.detectChanges()
    }
  }

  insertSelectedIngredient(ingredient: string) : void {
    !this.selectedIngredients().includes(ingredient)? this.selectedIngredients.update(ingredientsArray => {
      this.selectedIngredients().push(ingredient)
      return ingredientsArray
    }) : "";
  }

  removeSelectedIngredient(ingredient: string) {
    let ingredientIndex = this.selectedIngredients().indexOf(ingredient);
    ingredientIndex > -1? this.selectedIngredients.update(ingredientsArray => {
      this.selectedIngredients().splice(ingredientIndex, 1)
      return ingredientsArray
    }) : "";
  }

  onFileChange(fileInput : any) {
    this.file = fileInput.target.files[0];
    this.productForm.controls['image'].setValue(this.file ? this.file.name : '');
  }

  convertoBase64() {
    const reader = new FileReader();
    reader.onload = async (e: any) => {
      const base64Image = await e.target.result as string;
       this.imageBase64 = base64Image;
      this.cd.detectChanges()
    };
    reader.readAsDataURL(this.file);
  }

  formActionFunc() {
    if(this.productForm.valid && this.selectedIngredients.length >= 2 && this.selectedIngredients.length < 8) {
      if(!this.product) {
        this.convertoBase64()
        if(this.imageBase64) {
          this.product = {
            'id': uuid(),
            'ingredients': this.selectedIngredients(),
            'image': this.imageBase64,
            'name': this.productForm.value["name"],
            'value': this.productForm.value['price']
          }
          this.formAction.emit(this.product)
          this.productForm.reset()
          this.selectedIngredients.set([])
        }
        return
      }
      else if(this.productForm.value["image"] !== "") {
        this.convertoBase64()
        if(this.imageBase64){
          this.product.name = this.productForm.value['name']
          this.product.value = this.productForm.value['price']
          this.product.ingredients = this.selectedIngredients()
          this.product.image = this.imageBase64
          this.formAction.emit(this.product)
        }
        return;
      }

      this.product.name = this.productForm.value['name']
      this.product.value = this.productForm.value['price']
      this.product.ingredients = this.selectedIngredients()
      this.formAction.emit(this.product)
    }
  }

  cancelButtonFunc() {
    this.cancelButton.emit()
  }
}
