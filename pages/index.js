import { staticRequest } from "tinacms";
import { Layout } from "../components/Layout";
import { useTina } from "tinacms/dist/edit-state";

const query = `{
  page(relativePath: "home.mdx"){
    title
    text
  }
}`;

export default function Home(props) {
  // data passes though in production mode and data is updated to the sidebar data in edit-mode
  const { data } = useTina({
    query,
    variables: {},
    data: props.data,
  });

  const content = data.page.title;
  return (
    <Layout>
      <h1>{content}</h1>
    </Layout>
  );
}

export const getStaticProps = async () => {
  const variables = {};
  let data = {};
  try {
    data = await staticRequest({
      query,
      variables,
    });
  } catch {
    // swallow errors related to document creation
  }

  return {
    props: {
      data,
      //myOtherProp: 'some-other-data',
    },
  };
};
