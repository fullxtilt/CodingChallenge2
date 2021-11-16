package challenge.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import challenge.dao.CharacterDao;
import challenge.model.BookCharacter;


@Service("characterService")
public class CharacterServiceImpl implements CharacterService {

	private CharacterDao charDao;

	@Override
	public List<BookCharacter> findAllCharacters() {
		return charDao.findAll();
	}
	
	@Override
	public BookCharacter registerCharacter(BookCharacter bookCharacter) {
		return charDao.save(bookCharacter);
	}

	@Override
	public BookCharacter findCharacterById(int id) {
		return charDao.findById(id).get();
	}

	@Override
	public void removeCharacterById(int id) {
		charDao.deleteById(id);
	}

	@Override
	public BookCharacter updateCharacter(BookCharacter bookCharacter) {
		BookCharacter updatedCharacter = charDao.findById(bookCharacter.getCharId()).get();
	
		updatedCharacter.setName(bookCharacter.getName());
		updatedCharacter.setRace(bookCharacter.getRace());
		updatedCharacter.setGender(bookCharacter.getGender());
		updatedCharacter.setDescription(bookCharacter.getDescription());
		
		return charDao.save(updatedCharacter);
		
	}
	
///////////////// CONSTRUCTORS
	
	public CharacterServiceImpl() {
	}

	@Autowired
	public CharacterServiceImpl(CharacterDao charDao) {
		super();
		this.charDao = charDao;
	}
	
}
