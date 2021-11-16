package challenge.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import challenge.model.BookCharacter;
import challenge.service.CharacterService;

/**
 * Controller for operations on BookCharacter objects 
 */
@RestController
@RequestMapping("api/characters")
@CrossOrigin(origins = "#{environment.CHALLENGE_ANGULAR_IP_AND_PORT}", allowCredentials = "true")
public class CharacterController {
	
	private CharacterService charService;

	/**
	 * Responds with a list of all existing characters.
	 * @return The list of BookCharacters 
	 */
	@GetMapping()
	List<BookCharacter> getAllCharacter() {
		return charService.findAllCharacters();
	}
	
	/**
	 * Registers a new character in the database.
	 * @param character The charcter to be registered
	 * @return 			The registered character
	 */
	@PostMapping()
	@ResponseStatus(HttpStatus.CREATED)
	BookCharacter registerCharacter(@RequestBody BookCharacter character) {
		return charService.registerCharacter(character);
	}
	
	/**
	 * Deletes a character of the given id.
	 * @param id The index
	 */
	@DeleteMapping(params= {"id"})
	void deleteChar(int id) {
		charService.removeCharacterById(id);
	}
	
	/**
	 * Retrieves a character at a given index.
	 * @param 	id 	The index
	 * @return		The BookCharacter	
	 */
	@GetMapping(params= {"id"})
	BookCharacter getCharacterById(int id) {
		return charService.findCharacterById(id);
	}
	
	/**
	 * Updates a character that already exists in our database.
	 * @param bookCharacter The character to be updated
	 * @return				The updated character
	 */
	@PutMapping()
	BookCharacter updateCharacterById(@RequestBody BookCharacter bookCharacter) {
		return charService.updateCharacter(bookCharacter);
	}
	
/////////////////////////// CONSTRUCTORS
	public CharacterController() {
	}

	@Autowired
	public CharacterController(CharacterService charService) {
		super();
		this.charService = charService;
	}
}
