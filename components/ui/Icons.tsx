interface IconType {
  name: string;
}

const Icons: React.FC<IconType> = ({ name }) => {
  if (name === "mic") {
    return (
      <svg fill="red" viewBox="0 0 16 16" height="50" width="50">
        <path d="M16 8A8 8 0 110 8a8 8 0 0116 0zm-8 3a3 3 0 100-6 3 3 0 000 6z" />
      </svg>
    );
  } else if (name === "resume") {
    return (
      <svg fill="currentColor" viewBox="0 0 16 16" height="40" width="40">
        <path
          fill="currentColor"
          fillRule="evenodd"
          d="M3.05 2.75a.55.55 0 10-1.1 0v9.5a.55.55 0 001.1 0v-9.5zm2.683-.442A.5.5 0 005 2.75v9.5a.5.5 0 00.733.442l9-4.75a.5.5 0 000-.884l-9-4.75zM6 11.42V3.579L13.429 7.5l-7.43 3.92z"
          clipRule="evenodd"
        />
      </svg>
    );
  } else if (name === "pause") {
    return (
      <svg viewBox="0 0 16 16" fill="red" height="40" width="40">
        <path
          fill="red"
          d="M8 0a8 8 0 100 16A8 8 0 008 0zm0 14.5a6.5 6.5 0 110-13 6.5 6.5 0 010 13zM5 5h2v6H5zm4 0h2v6H9z"
        />
      </svg>
    );
  } else if (name === "stop") {
    return (
      <svg viewBox="0 0 512 512" fill="currentColor" height="40" width="40">
        <path d="M328 160H184c-13.2 0-24 10.8-24 24v144c0 13.2 10.8 24 24 24h144c13.2 0 24-10.8 24-24V184c0-13.2-10.8-24-24-24zM256 0C114.6 0 0 114.6 0 256s114.6 256 256 256 256-114.6 256-256S397.4 0 256 0zm0 464c-114.7 0-208-93.31-208-208S141.3 48 256 48s208 93.31 208 208-93.3 208-208 208z" />
      </svg>
    );
  }
};

export default Icons;
