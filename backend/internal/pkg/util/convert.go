package util

import "strconv"

func Str2Int(input string) (int, error) {
	res, err := strconv.Atoi(input)
	if err != nil {
		return -1, err
	}
	return res, nil
}

func Str2Int64(str string) (int64, error) {
	return strconv.ParseInt(str, 10, 64)
}

func Int2Str(input int) string {
	return strconv.Itoa(input)
}
func Int642Str(input int64) string {
	return strconv.FormatInt(input, 10)
}
