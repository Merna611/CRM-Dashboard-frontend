import { gql } from '@apollo/client';

export const DEAL_MOVED_SUBSCRIPTION = gql`
  subscription DealMoved {
    dealMoved {
      id title value stage probability updatedAt
      contact { id name }
      assignedTo { id name avatar }
    }
  }
`;

export const CONTACT_UPDATED_SUBSCRIPTION = gql`
  subscription ContactUpdated {
    contactUpdated {
      id name email phone company status tags updatedAt
      assignedTo { id name avatar }
    }
  }
`;

export const ACTIVITY_ADDED_SUBSCRIPTION = gql`
  subscription ActivityAdded {
    activityAdded {
      id type description createdAt
      user { id name avatar }
      contact { id name company }
      deal { id title }
    }
  }
`;
