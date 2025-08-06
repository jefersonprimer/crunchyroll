package validation

type Validator interface {
	Validate(interface{}) error
}
