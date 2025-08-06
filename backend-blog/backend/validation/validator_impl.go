package validation

import (
	"github.com/go-playground/validator/v10"
)

type ValidatorImpl struct {
	validate *validator.Validate
}

func NewValidatorImpl() *ValidatorImpl {
	return &ValidatorImpl{
		validate: validator.New(),
	}
}

func (v *ValidatorImpl) Validate(data interface{}) error {
	return v.validate.Struct(data)
}
