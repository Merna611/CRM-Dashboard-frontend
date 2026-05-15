import { gql } from '@apollo/client';

export const REGISTER_MUTATION = gql`
  mutation Register($input: RegisterInput!) {
    register(input: $input) {
      token
      user { id name email role avatar }
    }
  }
`;

export const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user { id name email role avatar }
    }
  }
`;

export const CREATE_CONTACT_MUTATION = gql`
  mutation CreateContact($input: ContactInput!) {
    createContact(input: $input) {
      id name email phone company status tags notes createdAt updatedAt
      assignedTo { id name avatar }
      deals { id title value stage }
    }
  }
`;

export const UPDATE_CONTACT_MUTATION = gql`
  mutation UpdateContact($id: ID!, $input: ContactInput!) {
    updateContact(id: $id, input: $input) {
      id name email phone company status tags notes createdAt updatedAt
      assignedTo { id name avatar }
      deals { id title value stage }
    }
  }
`;

export const DELETE_CONTACT_MUTATION = gql`
  mutation DeleteContact($id: ID!) {
    deleteContact(id: $id)
  }
`;

export const CREATE_DEAL_MUTATION = gql`
  mutation CreateDeal($input: DealInput!) {
    createDeal(input: $input) {
      id title value stage probability expectedClose createdAt updatedAt
      contact { id name email company }
      assignedTo { id name avatar }
    }
  }
`;

export const UPDATE_DEAL_MUTATION = gql`
  mutation UpdateDeal($id: ID!, $input: DealInput!) {
    updateDeal(id: $id, input: $input) {
      id title value stage probability expectedClose createdAt updatedAt
      contact { id name email company }
      assignedTo { id name avatar }
    }
  }
`;

export const DELETE_DEAL_MUTATION = gql`
  mutation DeleteDeal($id: ID!) {
    deleteDeal(id: $id)
  }
`;

export const MOVE_DEAL_MUTATION = gql`
  mutation MoveDeal($id: ID!, $stage: DealStage!) {
    moveDeal(id: $id, stage: $stage) {
      id title value stage probability updatedAt
      contact { id name }
      assignedTo { id name avatar }
    }
  }
`;

export const ADD_ACTIVITY_MUTATION = gql`
  mutation AddActivity($input: ActivityInput!) {
    addActivity(input: $input) {
      id type description createdAt
      user { id name avatar }
      contact { id name }
      deal { id title }
    }
  }
`;
