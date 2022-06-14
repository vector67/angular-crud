import { ApiState } from "./api.state";
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { featureKey } from "./api.reducers";

const selectApiFeature = createFeatureSelector<ApiState>(featureKey);

export const selectLoggedIn = createSelector(selectApiFeature, (state: ApiState) => state.loggedIn);

export const selectUserId = createSelector(selectApiFeature, (state: ApiState) => state.user?.id);

// export const selectContacts = createSelector(
//   selectApiFeature,
//   (state: ApiState) => state.vendor?.contacts
// )
// export const selectContact = (props: { contactId: string }) =>
//   createSelector(selectContacts, (contacts) => {
//     if (!contacts) {
//       return undefined;
//     }
//     return contacts.find(contact => contact.id == props.contactId);
//   });

// export const selectVendors = createSelector(selectApiFeature, (state: ApiState) => state.vendors);
// export const selectVendor = createSelector(selectApiFeature, (state: ApiState) => state.vendor);

export const selectApiState = createSelector(selectApiFeature, (state: ApiState) => state);
