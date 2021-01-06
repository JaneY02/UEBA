import { CONST_Usertype_color } from './const'

export const FILTER_Usertype_Text = (userType) => {
  switch (userType) {
    case 'intern':
      return '实习生'
    case 'probation':
      return '试用期'
    case 'regular':
      return '已转正'
    case 'quit':
      return '离职'
    case 'manager':
      return '管理员'
    default:
      return '-'
  }
}

export const FILTER_Usertype_color = (userType) => {
  switch (userType) {
    case 'intern':
      return CONST_Usertype_color[0]
    case 'probation':
      return CONST_Usertype_color[1]
    case 'regular':
      return CONST_Usertype_color[2]
    case 'quit':
      return CONST_Usertype_color[3]
    case 'manager':
      return CONST_Usertype_color[4]
    default:
      return '-'
  }
}