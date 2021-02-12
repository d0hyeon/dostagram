import { REGEXP_PASSWORD, REGEXP_EMAIL } from "./regex";
import type { Rule } from 'src/@types/rule';

export const EMAIL_RULES: Rule[] = [
  {required: true, message: '이메일을 입력해주세요.'},
  {pattern: REGEXP_EMAIL, message: '이메일 형식에 맞춰 입력해주세요.'}
]

export const PASSWORD_RULES: Rule[] = [
  {required: true, message: '비밀번호를 입력해주세요.' },
  {pattern: REGEXP_PASSWORD, message: '영문자, 숫자를 포함하여 8글자 이상 입력해주세요.'}
]