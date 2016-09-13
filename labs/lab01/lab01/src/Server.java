
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
		for(int i = 0; i< 100; i++){
			try {
//				System.out.println("Waiting for client to connect!");

				clientSocketArray[i] = serverSocket.accept();
				System.out.println("Server connected to client.");
				
				Thread thr = new Thread(new textReader(clientSocketArray, i));
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

	public synchronized void handle(String input) {
		// TODO new message, send to clients and then write it to history

		// TODO update own gui

	}

	public synchronized void remove(int ID) {
		// TODO get the serverthread, remove it from the array and then
		// terminate it

	}

//	private void addThread(Socket socket, int namer) {
//		Thread thr = new Thread(new chatClientHandler(socket, namer), "Client " + namer);
//		namer++;
//		thr.run();
//	}

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

	textReader(Socket[] clientSockets, int id) {
		this.id = id;
		this.socket = clientSockets[id];
		this.clientSockets = clientSockets;
	}
	
	public char decodeChar(byte b){
		return (char) (b ^ (byte) 240);
	}

	// This is the client handling code
	public void run() {
		InputStream in;
		String chat = "";
		
			try {
				in = socket.getInputStream();
				
				while(username == null){
					chat += decodeChar((byte) in.read());
					if(chat.endsWith(":endUsername")){
						username = chat.substring(0, chat.length() - 12);
						if(username.equalsIgnoreCase("Admin")){
							isAdmin = true;
						}
					}
				}
				
				System.out.println(username + " has joined the chat.");
				chat = "";
				
				while(true){
					chat += decodeChar((byte) in.read());
//					chat += (char) in.read();
					if(chat.endsWith(":endMessage")){
						chat = chat.substring(0, chat.length() - 11);
						System.out.print(chat);
						
						for(int i = 0; i < 100; i++){
							if(i != id && clientSockets[i] != null){
								PrintWriter out = null;
								try {
									out = new PrintWriter(new BufferedOutputStream(clientSockets[i].getOutputStream()));
									out.println(chat + ":endMessage");
									out.flush();
								} catch (IOException e1) {
									e1.printStackTrace();
								}
							}
						}
						//clears the current message TODO store the chat in text file later
						chat = "";
					} else if(chat.endsWith(":beginImage")){
						chat = "";
						System.out.println("Receiving image");
						Boolean imageTransfer = true;
						byte[] image = new byte[50030];
						int i = 0;
						while(imageTransfer){
							image[i] = (byte) in.read();
							if(i > 9){
								for(int j = i-9; j <= i; j++){
									chat += (char) image[j];
								}
								if(chat.endsWith(":endImage")){
									System.out.println("Image received");
									chat = chat.substring(0, chat.length() - 9);
									imageTransfer = false;
									FileOutputStream fis = new FileOutputStream("test.png");
									fis.write(image);
									fis.close();
								}
							}
							if(i<image.length){
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

//class textSender implements Runnable {
//	int id; // keeps track of its number just for identifying purposes
//	Socket socket;
//	PrintWriter out;
//
//	textSender(Socket socket, int id) {
//		this.id = id;
//		this.socket = socket;
//		
//		try {
//			out = new PrintWriter(new BufferedOutputStream(socket.getOutputStream()));
//		} catch (IOException e1) {
//			e1.printStackTrace();
//		}
//	}
//
//	// This is the client handling code
//	public void run() {
//		
//		while (true) {
//			try {
//
//				out.println("Hi");
//				out.flush(); // forces data from buffer to be sent to server
////				out.close();
//
//			} catch (IOException e) {
//				e.printStackTrace();
//			}
//		}
//	} // end of method run()
//}

//class chatClientHandler implements Runnable {
//	ServerSocket s; // this is socket on the server side that connects to the CLIENT
//	int clientNumber = 0; // keeps track of its number just for identifying purposes
//
//	chatClientHandler(ServerSocket s) {
//		this.s = s;
//	}
//
//	// This is the client handling code
//	public void run() {
//		
//		while (true) {
//
//			Socket clientSocket = null;
//			try {
//				System.out.println("Waiting for client" + " to connect!");
//
//				clientSocket = s.accept();
//				System.out.println("Server connected to client ");
//				
//				Thread reader = new Thread(new textReader(clientSocket, clientNumber));
//				reader.start();
//				
////				Thread sender = new Thread(new textSender(clientSocket, clientNumber));
////				sender.run();
//				
//				clientNumber++;
//			} catch (IOException e) {
//				e.printStackTrace();
//			}
//
//		}
//		
//	} // end of method run()
//
//	void printSocketInfo(Socket s) {
//		System.out.print("Socket on Server " + Thread.currentThread() + " ");
//		System.out.print("Server socket Local Address: " + s.getLocalAddress() + ":" + s.getLocalPort());
//		System.out.println("  Server socket Remote Address: " + s.getRemoteSocketAddress());
//	} // end of printSocketInfo
//
//}