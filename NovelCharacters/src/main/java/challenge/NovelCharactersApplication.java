package challenge;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@EnableJpaRepositories("challenge.*")
@ComponentScan(basePackages = { "challenge.*" })
@EntityScan("challenge.*") 
@SpringBootApplication
public class NovelCharactersApplication {

	public static void main(String[] args) {
		SpringApplication.run(NovelCharactersApplication.class, args);
	}

}
