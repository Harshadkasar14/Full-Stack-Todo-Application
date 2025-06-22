package com.restfulwebservices.todoEntity;


import com.restfulwebservices.user.User;
import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "todos")
public class Todo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String description;
    private LocalDate targetDate;
    private boolean done;

    @ManyToOne
    @JoinColumn(name = "user_id")  // foreign key to `users` table
    private User user;

    // Constructors
    public Todo() {}

    public Todo(String description, LocalDate targetDate, boolean done, User user) {
        this.description = description;
        this.targetDate = targetDate;
        this.done = done;
        this.user = user;
    }

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public LocalDate getTargetDate() {
		return targetDate;
	}

	public void setTargetDate(LocalDate targetDate) {
		this.targetDate = targetDate;
	}

	public boolean isDone() {
		return done;
	}

	public void setDone(boolean done) {
		this.done = done;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

}
