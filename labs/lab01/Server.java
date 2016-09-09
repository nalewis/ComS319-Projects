
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
	private ServerGUI frame;
	private Thread guiMessageThread;

	public Server(int port) {
		// TODO Binding and starting server
		// serverSocket.bind("localhost", 1222);

		try {
			System.out.println("Binding to port " + port + ", please wait  ...");
			serverSocket = new ServerSocket(port);
			System.out.println("Server started: " + serverSocket);
			start();
		} catch (IOException ioe) {
			System.out.println("Can not bind to port " + port + ": " + ioe.getMessage());
		}
	}

	public void run() {
		// TODO wait for a client or show error

	}

	public void start() {
		// frame = new ServerGUI();
		// frame.setVisible(true);
		// TODO launch a thread to read for new messages by the server
		int clientCount = 0;
		while (true) {

			// mainThread = new Thread(new listener(serverSocket, 1));
			// mainThread.run();

			Socket clientSocket = null;
			try {
				System.out.println("Waiting for client" + " to connect!");

				clientSocket = serverSocket.accept();
				System.out.println("Server connected to client " + clientCount);
				clientCount++;
				addThread(clientSocket, clientCount);

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

	public synchronized void handle(String input) {
		// TODO new message, send to clients and then write it to history

		// TODO update own gui

	}

	public synchronized void remove(int ID) {
		// TODO get the serverthread, remove it from the array and then
		// terminate it

	}

	private void addThread(Socket socket, int namer) {
		Thread thr = new Thread(new chatClientHandler(socket, namer), "Client " + namer);
		namer++;
		thr.run();
	}

	public static void main(String args[]) {
		Server server = null;
		server = new Server(1222);
	}
}

class chatClientHandler implements Runnable {
	Socket s; // this is socket on the server side that connects to the CLIENT
	int id; // keeps track of its number just for identifying purposes

	chatClientHandler(Socket s, int id) {
		this.s = s;
		this.id = id;
	}

	// This is the client handling code
	public void run() {
		// printSocketInfo(s); // just print some information at the server side
		// about the connection
		// Scanner in;
		Thread reader = new Thread(new textReader(s, 0));
		reader.run();
		// while (true) {
		// try {
		// //TODO send stuff
		// }
		// catch (IOException e) {
		// e.printStackTrace();
		// }
		// }
	} // end of method run()

	void printSocketInfo(Socket s) {
		System.out.print("Socket on Server " + Thread.currentThread() + " ");
		System.out.print("Server socket Local Address: " + s.getLocalAddress() + ":" + s.getLocalPort());
		System.out.println("  Server socket Remote Address: " + s.getRemoteSocketAddress());
	} // end of printSocketInfo

}

class textReader implements Runnable {
	int id; // keeps track of its number just for identifying purposes
	Socket socket;

	textReader(Socket socket, int id) {
		this.id = id;
		this.socket = socket;
	}

	// This is the client handling code
	public void run() {
		InputStream in;
		while (true) {
			try {
				in = socket.getInputStream();
				System.out.println("Client message: ");
				for (int i = 0; i < 100; i++) {//TODO find out how many bytes are being sent
					System.out.print((char) in.read());
				}
				

			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		// This handling code dies after doing all the printing
	} // end of method run()

}