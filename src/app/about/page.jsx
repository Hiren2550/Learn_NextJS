const takeTime = async () => {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, 4000);
  });
};

export default async function About() {
  await takeTime();
  return <div>This is About page</div>;
}
