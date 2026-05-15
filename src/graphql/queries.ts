import { gql } from '@apollo/client';

export const ME_QUERY = gql`
  query Me {
    me { id name email role avatar createdAt }
  }
`;

export const USERS_QUERY = gql`
  query Users {
    users { id name email role avatar }
  }
`;

export const CONTACTS_QUERY = gql`
  query Contacts($search: String, $status: ContactStatus, $assignedToId: ID) {
    contacts(search: $search, status: $status, assignedToId: $assignedToId) {
      id name email phone company status tags notes createdAt updatedAt
      assignedTo { id name avatar }
      deals { id title value stage }
    }
  }
`;

export const CONTACT_QUERY = gql`
  query Contact($id: ID!) {
    contact(id: $id) {
      id name email phone company status tags notes createdAt updatedAt
      assignedTo { id name avatar }
      deals { id title value stage probability expectedClose }
      activities {
        id type description createdAt
        user { id name avatar }
      }
    }
  }
`;

export const DEALS_QUERY = gql`
  query Deals($stage: DealStage, $assignedToId: ID) {
    deals(stage: $stage, assignedToId: $assignedToId) {
      id title value stage probability expectedClose createdAt updatedAt
      contact { id name email company }
      assignedTo { id name avatar }
    }
  }
`;

export const DEAL_QUERY = gql`
  query Deal($id: ID!) {
    deal(id: $id) {
      id title value stage probability expectedClose createdAt updatedAt
      contact { id name email company }
      assignedTo { id name avatar }
      activities {
        id type description createdAt
        user { id name avatar }
      }
    }
  }
`;

export const DASHBOARD_STATS_QUERY = gql`
  query DashboardStats {
    dashboardStats {
      totalContacts totalDeals totalRevenue wonDeals conversionRate
      pipelineByStage { stage count value }
      revenueByMonth { month revenue deals }
    }
  }
`;

export const ACTIVITIES_QUERY = gql`
  query Activities($contactId: ID, $dealId: ID, $limit: Int) {
    activities(contactId: $contactId, dealId: $dealId, limit: $limit) {
      id type description createdAt
      user { id name avatar }
      contact { id name company }
      deal { id title }
    }
  }
`;
