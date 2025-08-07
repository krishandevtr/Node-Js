# 💾 Node.js Streams, Buffers & File System Challenge

This challenge focus of node js core concepts such as js file system (`fs`), Buffers, and Streams. 

Each topic  focuses on one or more key concepts with increasing complexity.

---

## 📅 Topic-01: Read a Text File

### ✅ Task:
- Read a `.txt` file using `fs.readFile`.
- Log its content to the console.



---

## 📅 Topic-02:  Write to a Text File

### ✅ Task:
- Write a string to `output.txt` using `fs.writeFile`.

### 💡 Bonus:
- Append a timestamp every time you run the script.

---

## 📅 Topic-03: Buffers Basics

### ✅ Task:
- Create a `Buffer` from a string.
- Log the content and length.



---

## 📅 Topic-04: Copy with Streams

### ✅ Task:
- Use `fs.createReadStream()` and `fs.createWriteStream()` to copy a large `.txt` file.



---

## 📅 Topic-05: Transform Stream (Uppercase)

### ✅ Task:
- Create a custom `Transform` stream that converts incoming text to uppercase.
- Pipe input → transform → output.

---

## 📅 Topic-06:  Line-by-Line Stream

### ✅ Task:
- Use `readline` and `fs.createReadStream()` to process a large log file line by line.
- Create function that accepts a word.
- Created function write all the matching line with that word
- Used in error logs and other logging systems

---





---

## 🎯 Goal

Master `fs`, streams, buffers, backpressure, and file handling for real-world use cases like:
- File uploads
- Large file processing
- Video streaming
- Efficient memory usage

---

## 🛠 Tech Used

- Node.js (fs, stream, readline, http, buffer)

