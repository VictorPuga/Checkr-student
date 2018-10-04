export const GET_STUDENT_PROFILES = `
query GetStudentProfiles {
  queryStudentsByGroupIdNameIndex{
    items{
      id
      groupId
      username
    }
  }
}`;

export const GET_GROUPS = `
query GetGroups($groupId: ID!){
  queryGroupsByUserIdNameIndex(id: $groupId){
    items{
      icon
      color
      name
      id
    }
  }
}`

export const LINK_STUDENT_PROFILE_TO_USER = `
mutation LinkStudentProfileToUser($groupId: ID!, $studentId: ID!){
  linkStudentProfileToUser(
    input: {
      groupId: $groupId
      id: $studentId
    }
  ){
    id
    groupId
  }
}`

export const GET_STUDENT = `
query GetStudent($studentId: ID!, $groupId: ID!){
  getStudent(id: $studentId, groupId: $groupId){
    grades{
      items{
        grade
        appliedTestName
      }
    }
  }
}`

