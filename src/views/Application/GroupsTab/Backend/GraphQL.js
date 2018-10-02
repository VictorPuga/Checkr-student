import gql from 'graphql-tag';

export const GET_STUDENT_PROFILES = gql`
query GetStudentProfiles {
  queryStudentsByGroupIdNameIndex{
    items{
      id
      groupId
      username
    }
  }
}`;

export const GET_GROUPS = gql`
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

export const LINK_STUDENT_PROFILE_TO_USER = gql`
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

export const GET_STUDENT = gql`
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

