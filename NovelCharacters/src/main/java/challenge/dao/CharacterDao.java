package challenge.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import challenge.model.BookCharacter;

/**
 * Performs CRUD methods for BookCharacter entity.
 */
@Repository
public interface CharacterDao extends JpaRepository<BookCharacter, Integer> {
	
}
