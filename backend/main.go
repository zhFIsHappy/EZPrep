package main

import (
	"fmt"
)
import (
	"github.com/gin-gonic/gin"
	"net/http"
)

type user struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

var users = []user{
	{Email: "a@a.com", Password: "8888"},
	{Email: "b@b.com", Password: "7777"},
}

func getUsers(c *gin.Context) {
	fmt.Printf("Try get users\n")
	c.IndentedJSON(http.StatusOK, users)
}

func addUser(c *gin.Context) {
	var newUser user

	if err := c.BindJSON(&newUser); err != nil {
		return
	}
	users = append(users, newUser)
	c.IndentedJSON(http.StatusCreated, newUser)
}

func main() {
	fmt.Println("Hello world")

	router := gin.Default()
	router.GET("/users", getUsers)
	router.POST("/users", addUser)

	router.Run("localhost:8080")

}
