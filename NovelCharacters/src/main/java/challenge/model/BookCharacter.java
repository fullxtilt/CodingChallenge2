package challenge.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="BookCharacter")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookCharacter {

	@Id
	@Column(name="char_id")
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	int charId;
	
	@Column(name="char_name")
	String name;
	
	@Column(name="race")
	String race;
	
	@Column(name="gender")
	String gender;
	
	@Column(name="description")
	String description;
}
