
import java.net.*;
import java.util.Scanner;

import java.awt.EventQueue;
import java.io.*;

public class Client {
	private Socket socket = null;
	private Thread thread = null;
	private DataOutputStream streamOut = null;
	private PrintWriter out = null;
	// private ClientThread client = null;
	private String username;

	public static void main(String[] args) {
		String name;
		Scanner scanny = new Scanner(System.in);
		System.out.println("What is your username? ");
		name = scanny.nextLine();
		Client client = new Client("localhost", name, 1222);
		scanny.close();
	}

	public Client(String ipAddr, String username, int serverPort) {
		this.username = username;

		// set up the socket to connect to the gui
		try {
			socket = new Socket(ipAddr, serverPort);
			out = new PrintWriter(new BufferedOutputStream(socket.getOutputStream()));
			start();
		} catch (UnknownHostException h) {
			// JOptionPane.showMessageDialog(new JFrame(), "Unknown Host " +
			// h.getMessage());
			System.exit(1);
		} catch (IOException e) {
			// JOptionPane.showMessageDialog(new JFrame(), "IO exception: " +
			// e.getMessage());
			System.exit(1);
		}
	}

	public void run() {
		// TODO check for a new message, once we receive it, steamOut will send
		// it to the server
		String answer;
		String message;
		
//		while (true) {
			Scanner scan = new Scanner(System.in);
			System.out.println("Press '1' to send message, '2' for image.");
			
			answer = scan.nextLine();
			if (answer.equals("1")) {
				System.out.print("Enter your message: ");
				message = scan.nextLine();
				handleChat(message);
				
			} else if (answer.equals("2")) {

			} else {
				System.out.println("Invalid input, try again.");
			}
			scan.close();
			answer = null;
//		}

	}

	public synchronized void handleChat(String message) {
//		PrintWriter out = null;
//		try {
//			out = new PrintWriter(new BufferedOutputStream(socket.getOutputStream()));
//		} catch (IOException e) {
//			e.printStackTrace();
//		}
		
		out.println(username + " says " + message);
		out.flush();
//		out.close();
	}

	public void start() throws IOException {

//		PrintWriter out = new PrintWriter(new BufferedOutputStream(socket.getOutputStream()));

		out.println("User: " + username);
		out.flush(); // forces data from buffer to be sent to server
//		out.close();

		run();

	}

	public void stop() {
		// TODO

	}

}
