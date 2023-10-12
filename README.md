# HiTone

The innovative platform for improving your speech and communication skills. HiTone allows you to create custom speech scenarios, record your speech, and receive detailed analytics to enhance your speaking abilities.

If you have any questions, feel free to reach out to me on [LinkedIn](https://www.linkedin.com/in/sebgonzales/).

# Generating Script

![Screenshot 2023-10-11 at 10 07 39 PM](https://github.com/DevgenX/Hitone-app/assets/107775878/5af56cb5-8a5f-4354-8001-6871a8d12e3e)

# Recording yourself

![Screenshot 2023-10-11 at 10 13 08 PM](https://github.com/DevgenX/Hitone-app/assets/107775878/b46b5bfd-874e-4c45-9edc-6ba6f2247af7)

# Getting feedback 

![Screenshot 2023-10-11 at 10 14 04 PM](https://github.com/DevgenX/Hitone-app/assets/107775878/7a1c22b4-ef52-49e4-9593-e52a05ef337a)

# How It Works
<br>

You are given a form to fill-up with the details you need for the Speech. OpenAI API will generate it for you.

Step by step process

- Receive inputs from user
- OpenAI API will generate the script
- You are to record yourself speaking the speech provided
- The recording is converted into a supported format and transcripted by Whisper API
- OpenAI API receives the transcript and provide a feedback
- Stream feedback back to the user

# Requirements

- Get your OpenAI API keys here [API](https://platform.openai.com/account/api-keys)
- Go to the Utils folder under stream.ts and input your API key to the variable API_KEY
  
<img width="401" alt="Screenshot 2023-10-11 at 10 29 50 PM" src="https://github.com/DevgenX/Hitone-app/assets/107775878/ae900a63-b46f-4f40-8c04-185992f91144">


# Running Locally

1. Clone the repo
  ```
  git@github.com:DevgenX/Hitone-app.git
  ```
2. Install dependencies
  ```
  npm i or npm install
  ```
3. Running the application
  ```
  npm run dev
  ```

# Improvement Ideas
Here are some ideas for how to improve HiTone:
- Provide better UI by creating a separate route for the analytics
- Provide accurate script generation by improving prompt
- Improve feedback by having accurate transcriptions
- Train own model for transcription and analysis
- Contribute your ideas by reaching out to me!




