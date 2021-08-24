import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ValidatorService } from 'src/app/shared/validator/validator.service';


import { emailPattern, nombreApellidoPattern, noPuedeSerStrider } from 'src/app/shared/validator/validaciones';
import { EmailValidatorService } from '../../../shared/validator/email-validator.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styles: [
  ]
})
export class RegistroComponent implements OnInit {

  // TODO:
  // nombreApellidoPattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';
  // emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

  // noPuedeSerStrider( control: FormControl ) {
  //   const valor: string = control.value?.trim().toLowerCase();
  //   if ( valor === 'strider' ) {
  //     return {
  //       noStrider: true
  //     }
  //   }

  //   return null
  // }

  miFormulario: FormGroup = this.fb.group({
    nombre: ['', [ Validators.required, Validators.pattern( this.validatorService.nombreApellidoPattern ) ] ],
    email: ['', [ Validators.required, Validators.pattern( this.validatorService.emailPattern ) ], [ this.emailValidatorService ] ],
    username: ['', [ Validators.required, this.validatorService.noPuedeSerStrider ] ],
    password: ['', [ Validators.required, Validators.minLength(6) ] ],
    password2: ['', [ Validators.required,  ]],
  },
  {
    validators: [ this.validatorService.camposIguales( 'password', 'password2' ) ]
  });

  get emailErrorMsg(): string {
    const errors = this.miFormulario.get('email')?.errors;

    if ( errors?.required ) {
      return 'Email es obligatorio';
    } else if ( errors?.pattern ) {
      return 'No tiene fromato de Email'
    } else if ( errors?.emailTomado ) {
      return 'Email en uso';
    }

    return '';
  }

  constructor( private fb: FormBuilder,
               private validatorService: ValidatorService,
               private emailValidatorService: EmailValidatorService ) { }

  ngOnInit(): void {

    this.miFormulario.reset({
      nombre: 'Daniel del',
      email: 'test1@test.com',
      username: 'Ziborg',
      password: '123456',
      password2: '123456'
    })

  }

  campoNoValido( campo: string ) {
    return this.miFormulario.get(campo)?.invalid
            && this.miFormulario.get(campo)?.touched;
  }



  // emailRequred() {
  //   return this.miFormulario.get('email')?.errors?.required
  //           && this.miFormulario.get('email')?.touched;
  // }

  // emailFormato() {
  //   return this.miFormulario.get('email')?.errors?.pattern
  //           && this.miFormulario.get('email')?.touched;
  // }

  // emailTomado() {
  //   return this.miFormulario.get('email')?.errors?.emailTomado
  //           && this.miFormulario.get('email')?.touched;
  // }

  submitFormulario() {

    console.log( this.miFormulario.value );

    this.miFormulario.markAllAsTouched();

  }

}
