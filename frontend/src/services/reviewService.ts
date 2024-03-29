import gql from "graphql-tag";

/**
 * Post a new review for a kommune
 * @param kommuneId id of the kommune to post a review for
 * @param name user input for kommune name
 * @param rating user input for kommune rating
 * @param title user input for kommune title
 * @param description user input for kommune description
 */
function POST_REVIEW() {
  return gql`
    mutation (
      $name: String!
      $rating: Int!
      $title: String!
      $description: String!
      $kommuneId: ID!
    ) {
      addKommuneRating(
        name: $name
        rating: $rating
        title: $title
        description: $description
        kommuneId: $kommuneId
      ) {
        _id
        timestamp
      }
    }
  `;
}

/**
 * get all reviews for a kommune
 * @param id id of the kommune to get reviews for
 * @returns array with name, rating, title, description and timestamp
 */
function GET_REVIEWS() {
  return gql`
    query Kommune($id: String) {
      kommune(id: $id) {
        kommuneRating {
          name
          rating
          title
          description
          timestamp
          _id
        }
      }
    }
  `;
}

const reviewService = {
  POST_REVIEW,
  GET_REVIEWS,
};

export default reviewService;
