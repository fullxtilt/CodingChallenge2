import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IBookCharacter } from 'src/app/models/bookcharacter';
import { CharacterService } from 'src/app/services/character.service';

/**
 * Where the user may register a new character.
 */
@Component({
  selector: 'app-add-character',
  templateUrl: './add-character.component.html',
  styleUrls: ['./add-character.component.css']
})
export class AddCharacterComponent implements OnInit {

  /**
   * Form for registering a character
   */
  charForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    race: new FormControl('', [Validators.required, Validators.minLength(3)]),
    gender: new FormControl('', [Validators.required, Validators.minLength(3)]),
    description: new FormControl('', [Validators.required, Validators.minLength(3)]),
  });

  constructor(private charService: CharacterService, private router: Router) { }

  ngOnInit(): void {
  }

  /**
   * Register a new character.
   */
  onSubmitAdd() {
    // Instantiate a character using form data
    let newCharacter: IBookCharacter = {
      charId: 0,
      name: this.charForm.get('name')?.value,
      race: this.charForm.get('race')?.value,
      gender: this.charForm.get('gender')?.value,
      description: this.charForm.get('description')?.value
    }

    // Send to backend 
    this.charService.registerCharacter(newCharacter).subscribe(
      (response) => {
        console.log("registered:", response);

        // Route to homepage
        this.router.navigate(['']);
      }
    );
  }

}
