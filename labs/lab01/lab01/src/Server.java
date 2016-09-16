//package lab3;

import java.net.*;
import java.util.ArrayList;
import java.util.Random;
import java.util.Scanner;
import java.io.*;

public class Server implements Runnable {

	private ServerSocket serverSocket = null;
	private Thread mainThread = null;
	private File file = new File("chat.txt");
	private PrintWriter writer;

	private static Socket[] clientSocketArray = new Socket[100];
	private File chatLog = new File("chat.txt");

	private FileWriter logWriter;
	private BufferedWriter logBuffer;

	public Server(int port) {
		// TODO Binding and starting server
		// serverSocket.bind("localhost", 1222);

		try {
			System.out
					.println("Binding to port " + port + ", please wait  ...");
			serverSocket = new ServerSocket(port);
			System.out.println("Server started: " + serverSocket);

			// chatLog.delete();
			logWriter = new FileWriter(chatLog, true);
			logBuffer = new BufferedWriter(logWriter);
			// logPrinter = new PrintWriter(logBuffer);

			start();
		} catch (IOException ioe) {
			System.out.println("Can not bind to port " + port + ": "
					+ ioe.getMessage());
		}
	}

	public void run() {
		// TODO wait for a client or show error

	}

	public void start() {
		for (int i = 0; i < 100; i++) {
			try {
				// System.out.println("Waiting for client to connect!");

				clientSocketArray[i] = serverSocket.accept();
				System.out.println("Server connected to client.");

				Thread thr = new Thread(new textReader(clientSocketArray, i, logBuffer));
				thr.start();

			} catch (IOException e) {
				e.printStackTrace();
			}
		}

	}

	public void stop() {
		// TODO

	}

	private int findClient(int ID) {
		// TODO Find Client

		return -1;
	}

	public synchronized void remove(int ID) {
		// TODO get the serverthread, remove it from the array and then
		// terminate it

	}

	public static void main(String args[]) {
		Server server = null;
		server = new Server(1222);
	}
}

class textReader implements Runnable {
	int id; // keeps track of its number just for identifying purposes
	Socket socket;
	String username = null;
	Socket[] clientSockets;
	Boolean isAdmin = false;
	BufferedWriter myWriter;
	Boolean isLogRequest = false;

	textReader(Socket[] clientSockets, int id, BufferedWriter logWriter) {
		this.id = id;
		this.socket = clientSockets[id];
		this.clientSockets = clientSockets;
		this.myWriter = logWriter;
	}

	public char decodeChar(byte b) {
		return (char) (b ^ (byte) 240);
	}

	//send message on to socket
	public synchronized void handleChat(byte[] image, Socket socket)
			throws IOException {
		String message = username + ": :beginImage";
		OutputStream streamOut = socket.getOutputStream();
		streamOut.write(message.getBytes());
		streamOut.write(image);
		String end = ":endImage";
		streamOut.write(end.getBytes());
		streamOut.flush();
	}

	// This is the client handling code
	public void run() {
		InputStream in;
		String chat = "";

		try {
			in = socket.getInputStream();
			//parse for this thread's client's username
			while (username == null) {
				chat += decodeChar((byte) in.read());
				if (chat.endsWith(":endUsername")) {
					username = chat.substring(0, chat.length() - 12);
					if (username.equalsIgnoreCase("Admin")) {
						isAdmin = true;
					}
				}
			}

			System.out.println(username + " has joined the chat.");
			chat = "";
			//begin checking for messages
			while (true) {
				isLogRequest = false;
				chat += decodeChar((byte) in.read());
				// chat += (char) in.read();
				if (chat.endsWith(":endMessage")) {
					chat = chat.substring(0, chat.length() - 11);

					if (chat.equalsIgnoreCase("admin: sendAdminChatLogs")) {
						isLogRequest = true;
						chat = "";
						File chatHistory = new File("chat.txt");
						Scanner chatFileScanner = new Scanner(chatHistory);

						while (chatFileScanner.hasNext()) {
							chat += (chatFileScanner.nextLine()) + "\n";
						}

						chatFileScanner.close();
					} if (chat.contains("admin: deleteLine")) {
												
						int lineToDelete = Integer.parseInt(chat.substring(17));
						
						File chatHistory = new File("chat.txt");
						Scanner chatFileScanner = new Scanner(chatHistory);
						
						File newHistory = new File("temp.txt");
						FileWriter newWriter = new FileWriter(newHistory);
						BufferedWriter newBuffer = new BufferedWriter(newWriter);
						
						int i = 1;
						while (chatFileScanner.hasNext()){
							String currentLine = (chatFileScanner.nextLine() + "\n");
							if (i != lineToDelete) {
								newBuffer.write(currentLine);
								newBuffer.flush();
							}
							
							i++;
						}
						
						chatHistory.delete();
						newHistory.renameTo(chatHistory);
						
						newBuffer.close();
						newWriter.close();
						
						chatFileScanner.close();
												
					} else {
						
						chat += "\n";
						myWriter.write(chat);
						myWriter.flush();
					}

					for (int i = 0; i < 100; i++) {
						if (i != id && clientSockets[i] != null
								&& !isLogRequest) {
							PrintWriter out = null;
							try {
								out = new PrintWriter(
										new BufferedOutputStream(
												clientSockets[i]
														.getOutputStream()));
									out.println(chat + ":endMessage");
									out.flush();
								System.out.println(chat);
							} catch (IOException e1) {
								e1.printStackTrace();
							}
						} else if (isLogRequest && clientSockets[i] != null) {
							PrintWriter out = null;
							try {
								out = new PrintWriter(
										new BufferedOutputStream(
												clientSockets[i]
														.getOutputStream()));
									out.println(chat + ":endLog");
									out.flush();
								System.out.println(chat);
							} catch (IOException e1) {
								e1.printStackTrace();
							}
						}
					}
						// clears the current message TODO store the chat in
						// text file later
						chat = "";
				} else if (chat.endsWith(":beginImage")) {
					chat = "";
					System.out.println("Receiving image");
					Boolean imageTransfer = true;
					//max byte size of image is 30000
					byte[] image = new byte[30030];
					int i = 0;
					while (imageTransfer) {
						image[i] = (byte) in.read();
						if (i > 29999) {
							for (int j = i - 9; j <= i; j++) {
								chat += (char) image[j];
							}
							if (chat.endsWith(":endImage")) {
								System.out.println("Image received");
								for (int k = 0; k < 100; k++) {
									if (clientSockets[k] != null) {
										handleChat(image, clientSockets[k]);
									}
								}

								imageTransfer = false;
								chat = "";
							}
						}
						if (i < image.length) {
							i++;
						} else {
							System.out.println("Failed, image too large");
							imageTransfer = false;
						}

					}
				}
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
	} // end of method run()

}
