package challenge.service;

import java.util.List;

import challenge.model.BookCharacter;

/**
 * Service class for BookCharacter objects.
 */
public interface CharacterService {
	
	/**
	 * Retrieves all characters from database.
	 * 
	 * @return The list of characters
	 */
	List<BookCharacter> findAllCharacters();
	
	/**
	 * Registers a character in the database.
	 * 
	 * @param bookCharacter The character to be registered, not null
	 * @return 				The registered character
	 */
	BookCharacter registerCharacter(BookCharacter bookCharacter);
	
	/**
	 * Retrieves a character by id.
	 * 
	 * @id The index
	 * @return The character
	 */
	BookCharacter findCharacterById(int id);
	
	/**
	 * Removes a character by id.
	 * 
	 * @param id The index
	 */
	void removeCharacterById(int id);
	
	/**
	 * Updates given character that already exists in the database.
	 * 
	 * @param 	bookCharacter 	The character to be updated, not null
	 * @return 					The updated character
	 */
	BookCharacter updateCharacter(BookCharacter bookCharacter);
}
