
import java.net.*;
import java.util.Scanner;

import java.awt.EventQueue;
import java.io.*;

public class Client {
	private Socket socket = null;
	private Thread thread = null;
	private DataOutputStream streamOut = null;
	private static PrintWriter out = null;
	// private ClientThread client = null;
	private String username;
	private static Scanner scan = new Scanner(System.in);

	public static void main(String[] args) {
		String name;

		System.out.println("What is your username? ");
		name = scan.nextLine();
		ClientThread client = new ClientThread("localhost", name, 1222);

	}
	
	
	private static class ClientThread implements Runnable
	{
		private Socket socket = null;
		private DataOutputStream streamOut = null;
		private String username;
		
	
		public ClientThread(String ipAddr, String username, int serverPort)
		{
			this.username = username;
			// set up the socket to connect to the gui
			try {
				socket = new Socket(ipAddr, serverPort);
				out = new PrintWriter(new BufferedOutputStream(socket.getOutputStream()));
				start();
			} catch (UnknownHostException h) {
				System.out.println("Unknown Host " + h.getMessage());
				System.exit(1);
			} catch (IOException e) {
				System.out.println("IO exception: " + e.getMessage());
				System.exit(1);
	
			}
		}
		
			
		public void run() {
			// TODO check for a new message, once we receive it, steamOut will send
			// it to the server
			String answer;
			String message;
				
	
			while (true) {
	
				System.out.println("Press '1' to send message, '2' for image.");
				answer = scan.nextLine();
				
				if (answer.equals("1")) {
					System.out.print("Enter your message: ");
					
					if (scan.hasNext())
					{
						message = scan.nextLine();
						handleChat(message);
					}
					
				} else if (answer.equals("2")) {
					//TODO implement image encoding
				} else {
					System.out.println("Invalid input, try again.");
				}
				answer = null;
			}
	
		}
	
		public synchronized void handleChat(String message) {
			out.println(username + " says " + message);
			out.flush();
	//		out.close();
		}
	
		public void start() throws IOException {
	
			out.println(username + ":endUsername");
			out.flush(); // forces data from buffer to be sent to server
	//		out.close();
	
			run();
	
		}
	
		public void stop() {
			// TODO
	
	
		}
	}
}