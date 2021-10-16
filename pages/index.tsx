import type { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import Image from "next/image";
import { TextField, Paper, Button } from "../components";

const Home: NextPage = () => {
  const router = useRouter();
  return (
    <div className="justify-self-center w-96">
      <Paper>
        <form className="p-10">
          <TextField
            label="Name"
            name="name"
            placeholder="Set your name"
            fullWidth
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            placeholder="Set your email"
            fullWidth
          />
          <Button
            fullWidth
            onClick={() => router.push("/chat-room")}
            type="button"
          >
            Enter
          </Button>
        </form>
      </Paper>
    </div>
  );
};

export default Home;
