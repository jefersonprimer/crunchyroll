package validation

type Validator interface {
	ValidateEmail(email string) error

	ValidatePassword(password string) error

	ValidateUsername(username string) error
}
