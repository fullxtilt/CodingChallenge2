import { DataSource } from '@angular/cdk/collections';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { IBookCharacter } from 'src/app/models/bookcharacter';
import { CharacterService } from 'src/app/services/character.service';

/**
 * Where the user can view a list of all existing characters.
 */
@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.css']
})
export class CharacterListComponent implements OnInit, AfterViewInit {

  /**
   * Array containing all existing charactes
   */
  characters: IBookCharacter[] = [];

  /**
   * Array containing a filtered list of characters
   */
  charactersFiltered: IBookCharacter[] = [];

  /**
   * Input from character filter
   */
  private _filterInput: string = '';

  /**
   * `IBookCharacter` attributes to be displayed 
   */
  displayedColumns: string[] = ['charId', 'name', 'race', 'gender', 'description'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource: MatTableDataSource<IBookCharacter> = new MatTableDataSource<IBookCharacter>();

  constructor(private charService: CharacterService, private router: Router) { }

  ngOnInit(): void {
    // Retrieve list of characters
    this.charService.getAllCharacters().subscribe(
      (characters) => {
        this.characters = characters;
        this.charactersFiltered = characters;
        this.dataSource = new MatTableDataSource<IBookCharacter>(this.charactersFiltered);
        this.dataSource.paginator = this.paginator;
        console.log(this.dataSource);
      }
    );
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  /**
   * Save targeted character in service and then route to modify character view.
   * @param bookCharacter The targeted character
   */
  onRowClicked(bookCharacter: IBookCharacter) {
    this.charService.setTargetedCharacter(bookCharacter);
    this.router.navigate(['/modify-character']);
  }

  get filterInput() {
    return this._filterInput;
  }

  set filterInput(filterInput: string) {
    this._filterInput = filterInput;

    // Filter list
    if (this._filterInput) {
      this.charactersFiltered = this.characters.filter(
        (character: IBookCharacter) => {
          if (character.name.toLowerCase().indexOf(filterInput) !== -1) 
            return true;
          else if (character.race.toLowerCase().indexOf(filterInput) !== -1)
            return true;
          else if (character.gender.toLowerCase().indexOf(filterInput) !== -1)
            return true;

          return false;
        }
      );
      this.dataSource = new MatTableDataSource(this.charactersFiltered);
    }
    // Reset if filter is empty
    else {
      this.charactersFiltered = this.characters;
      this.dataSource = new MatTableDataSource(this.charactersFiltered);
    }
  }

}
