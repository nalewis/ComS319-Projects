
import java.net.*;
import java.util.Scanner;

import java.awt.EventQueue;
import java.io.*;

public class Client {
	private static Socket socket = null;
	private Thread thread = null;
	private DataOutputStream streamOut = null;
	private static InputStream streamIn = null;
	private static PrintWriter out = null;
	// private ClientThread client = null;
	private String username;
	private static Scanner scan = new Scanner(System.in);
	
	public static void main(String[] args) {
		String name;

		System.out.println("What is your username? ");
		name = scan.nextLine();
		Thread client = new Thread(new ClientThread("localhost", name, 1222));
		client.start();
		System.out.println("END INIT");
		
		while (true)
		{
			String messageFromServer = "";
			String messageSender = null;
			
			try {
				streamIn = socket.getInputStream();
				
				while(!(messageFromServer.endsWith(":endMessage")) && !(messageFromServer.endsWith(":endLog")) ){
					messageFromServer += (char) streamIn.read();
				}
				
				if ((messageFromServer.endsWith(":endMessage"))){
					messageFromServer = messageFromServer.substring(0, messageFromServer.length() - 11);
					
					System.out.println(messageFromServer);
				}
				else if (messageFromServer.endsWith(":endLog")){
					if (name.equalsIgnoreCase("admin")){
						System.out.print(messageFromServer.substring(0, messageFromServer.length() - 7));
					}
				}
				
				
			} catch (IOException e) {
				e.printStackTrace();
			}
		}

	}
	
	
	private static class ClientThread implements Runnable
	{
		private OutputStream streamOut = null;
		private String username;
		private boolean isAdmin;
		
	
		public ClientThread(String ipAddr, String username, int serverPort)
		{
			this.username = username;
			this.isAdmin = this.username.equalsIgnoreCase("admin");
			// set up the socket to connect to the gui
			try {
				socket = new Socket(ipAddr, serverPort);
				out = new PrintWriter(new BufferedOutputStream(socket.getOutputStream()));
				streamOut = socket.getOutputStream();
//				start();
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
			
			try {
				streamOut.write(encodeMessage(username + ":endUsername"));
				streamOut.flush(); // forces data from buffer to be sent to server
			} catch (IOException e1) {
				// TODO Auto-generated catch block
				e1.printStackTrace();
			}
	
			while (true) {
				if (isAdmin){
					System.out.println("ADMIN OPTIONS: Press '1' to send message to all clients, press '2' to list the images so far from chat.txt, press '3' to delete a message from chat.txt.");
				}
				else{
					System.out.println("Press '1' to send message, '2' for image.");
				}
				
				answer = scan.nextLine();
				
				if (isAdmin)
				{
					if (answer.equals("1")){
						System.out.print("Enter your message: ");
						
						if (scan.hasNext()){
							message = scan.nextLine();
							try {
								handleChat(message);
							} catch (IOException e) {
								// TODO Auto-generated catch block
								e.printStackTrace();
							}
						}
					} else if (answer.equals("2")) {
						try {
							handleChat("sendAdminChatLogs");
						} catch (IOException e) {
							e.printStackTrace();
						}
					} else if (answer.equals("3")) {
						//TODO implement deleting line
					} else  {
						System.out.println("Invalid input, try again.");
					}
				}
				else
				{
					if (answer.equals("1")) {
						System.out.print("Enter your message: ");
						
						if (scan.hasNext()){
							message = scan.nextLine();
							try {
								handleChat(message);
							} catch (IOException e) {
								// TODO Auto-generated catch block
								e.printStackTrace();
							}
						}
						
					} else if (answer.equals("2")) {
						//TODO implement image encoding
						try {
							byte[] image = new byte[50000];
							FileInputStream fis = new FileInputStream("pic.png");
							fis.read(image);
							FileOutputStream fos = new FileOutputStream("test2.png");
							fos.write(image);
							handleChat(image);
						} catch (IOException e) {
							// TODO Auto-generated catch block
							e.printStackTrace();
						}
					} else {
						System.out.println("Invalid input, try again.");
					}
				}
				
				
				answer = null;
			}
	
	
		}
	
		public synchronized void handleChat(String message) throws IOException {
			message = username + ": " + message + ":endMessage";
			streamOut.write(encodeMessage(message));
			streamOut.flush();
		}
		
		public synchronized void handleChat(byte[] image) throws IOException {
			String message = username + ": :beginImage";
			streamOut.write(encodeMessage(message));
			streamOut.write(image);
			String end = ":endImage";
			streamOut.write(end.getBytes());
			streamOut.flush();
		}
		
		public byte[] encodeMessage(String message){
			byte[] encoded = message.getBytes();
			for(int i = 0; i<message.length(); i++){
				encoded[i] = (byte) (encoded[i] ^ (byte) 240);
			}
			return encoded;
		}
		
//		public void displayChatLog(){		
//			try {
//				
//			} catch (IOException e) {
//				e.printStackTrace();
//			}
//		}
	
		public void start() throws IOException {
	
			
	//		out.close();
	
			run();
	
		}
	
		public void stop() {
			// TODO
	
	
		}
		
		
	}
}
