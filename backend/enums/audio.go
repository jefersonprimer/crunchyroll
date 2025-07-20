package enums

type AudioLanguage string

const (
	Portuguese AudioLanguage = "portuguese"
	Japanese   AudioLanguage = "japanese"
	Chinese    AudioLanguage = "chinese"
	Korean     AudioLanguage = "korean"
)

type AudioType string

const (
	AudioTypeSubtitled       AudioType = "subtitled"
	AudioTypeDubbed          AudioType = "dubbed"
	AudioTypeSubtitledDubbed AudioType = "subtitled_dubbed"
)

func (al AudioLanguage) IsValid() bool {
	switch al {
	case Portuguese, Japanese, Chinese, Korean:
		return true
	}
	return false
}

func (at AudioType) IsValid() bool {
	switch at {
	case AudioTypeSubtitled, AudioTypeDubbed, AudioTypeSubtitledDubbed:
		return true
	}
	return false
}
