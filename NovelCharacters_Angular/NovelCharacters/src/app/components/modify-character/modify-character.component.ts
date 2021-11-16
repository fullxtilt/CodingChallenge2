import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { IBookCharacter } from 'src/app/models/bookcharacter';
import { CharacterService } from 'src/app/services/character.service';

/**
 * Where the user may update or delete an existing character.
 */
@Component({
  selector: 'app-modify-character',
  templateUrl: './modify-character.component.html',
  styleUrls: ['./modify-character.component.css']
})
export class ModifyCharacterComponent implements OnInit {

  /**
   * Form for updating a character's information.
   */
  charForm: FormGroup = new FormGroup({
    target: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    race: new FormControl('', [Validators.required, Validators.minLength(3)]),
    gender: new FormControl('', [Validators.required, Validators.minLength(3)]),
    description: new FormControl('', [Validators.required, Validators.minLength(3)]),
  });

  /**
   * Array containing all existing characters
   */
  characters: IBookCharacter[] = [];

  /**
   * Targeted character
   */
  targetCharacter: IBookCharacter | null = null;

  aCharacterWasDeleted: boolean = false;
  deletedCharacterName: string | null = null;

  aCharacterWasUpdated: boolean = false;
  updatedCharacterName: string | null = null;

  constructor(private charService: CharacterService) { }

  ngOnInit(): void {
    this.getCharacters();

    // Check if a character was already targeted
    this.targetCharacter = this.charService.getTargetedCharacter();
    this.displayTargetedCharacter();
  }

  /**
   * Populate `characters` with data from backend.
   */
  getCharacters() {
    this.charService.getAllCharacters().subscribe(
      (characters) => {this.characters = characters;}
    );
  }

  /**
   * Mark our selection as the target character.
   * @param event Contains information from the firing element
   */
  onCharacterSelect(event: MatSelectChange) {
    this.targetCharacter = event.value;
    this.displayTargetedCharacter();
  }

  /**
   * Change form data to match new target.
   */
  private displayTargetedCharacter() {
    if (!this.targetCharacter)
      return;

    this.charForm.setValue({
      target: this.targetCharacter,
      name: this.targetCharacter.name,
      race: this.targetCharacter.race,
      gender: this.targetCharacter.gender,
      description: this.targetCharacter.description
    });
  }

  /**
   * Update the target character's information. 
   */
  onSubmitModify() {
    // Instantiate a character using form data
    let newCharacter: IBookCharacter = {
      charId: this.targetCharacter!.charId,
      name: this.charForm.get('name')?.value,
      race: this.charForm.get('race')?.value,
      gender: this.charForm.get('gender')?.value,
      description: this.charForm.get('description')?.value
    }

    // Save character name for feedback
    this.updatedCharacterName = newCharacter.name;

    // Send it to our backend
    this.charService.updateCharacter(newCharacter).subscribe(
      ()=> { 
        // Give feedback to user
        this.aCharacterWasUpdated = true;

        // Make sure our character list is up to date
        this.getCharacters() 
      }
    );
  }

  /**
   * Delete target character.
   */
  onDeleteCharacter() {
    if (this.targetCharacter) {
      // Save deleted character's name for feedback
      this.deletedCharacterName = this.targetCharacter.name;

      this.charService.deleteCharacter(this.targetCharacter.charId).subscribe(
        () => {
          // Give feedback to user
          this.aCharacterWasDeleted = true;

          // Keep list up to date
          this.getCharacters();
        }
      );
    }
  }

}
