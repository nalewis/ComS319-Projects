import java.net.*;
import java.util.Scanner;
import java.io.*;

public class Client {
	private static Socket socket = null;
	private static InputStream streamIn = null;
	private static PrintWriter out = null;
	private static Scanner scan = new Scanner(System.in);

	public static void main(String[] args) {
		String name;

		System.out.println("What is your username? ");
		name = scan.nextLine();
		Thread client = new Thread(new ClientThread("localhost", name, 1222));
		client.start();

		while (true) {
			String messageFromServer = "";
			String messageSender = null;

			try {
				streamIn = socket.getInputStream();

				while (!(messageFromServer.endsWith(":endMessage"))
						&& !(messageFromServer.endsWith(":endLog"))
						&& !(messageFromServer.endsWith(":beginImage"))) {
					messageFromServer += (char) streamIn.read();
				}

				if ((messageFromServer.endsWith(":endMessage"))) {
					messageFromServer = messageFromServer.substring(0,
							messageFromServer.length() - 11);

					System.out.println(messageFromServer);
				} else if (messageFromServer.endsWith(":endLog")) {
					if (name.equalsIgnoreCase("admin")) {
						System.out.print(messageFromServer.substring(0,
								messageFromServer.length() - 7));
					}
				} else if (messageFromServer.endsWith(":beginImage")) {
					messageFromServer = "";
					System.out.println("Receiving image");
					Boolean imageTransfer = true;
					//max image size is about 30000 bytes
					byte[] image = new byte[30030];
					int i = 0;
					while (imageTransfer) {
						image[i] = (byte) streamIn.read();
						if (i > 29999) {
							for (int j = i - 9; j <= i; j++) {
								messageFromServer += (char) image[j];
							}
							if (messageFromServer.endsWith(":endImage")) {
								imageTransfer = false;
								FileOutputStream fos = new FileOutputStream(
										"message.png");
								fos.write(image);
								fos.close();
								System.out
										.println("Saved image as message.png");
								messageFromServer = "";
							}
							if (i % 1000 == 0) {
								System.out.println(i + "/30000 bytes received");
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
			} catch (IOException e) {
				e.printStackTrace();
			}
		}

	}

	private static class ClientThread implements Runnable {
		private OutputStream streamOut = null;
		private String username;
		private boolean isAdmin;

		public ClientThread(String ipAddr, String username, int serverPort) {
			this.username = username;
			this.isAdmin = this.username.equalsIgnoreCase("admin");

			try {
				socket = new Socket(ipAddr, serverPort);
				out = new PrintWriter(new BufferedOutputStream(
						socket.getOutputStream()));
				streamOut = socket.getOutputStream();
				System.out.println("Connected to server.");
			} catch (UnknownHostException h) {
				System.out.println("Unknown Host " + h.getMessage());
				System.exit(1);
			} catch (IOException e) {
				System.out.println("IO exception: " + e.getMessage());
				System.exit(1);
			}
		}

		public void run() {
			String answer;
			String message;

			try {
				streamOut.write(encodeMessage(username + ":endUsername"));
				streamOut.flush();
			} catch (IOException e1) {
				e1.printStackTrace();
			}

			//input checking for this client
			while (true) {
				if (isAdmin) {
					System.out
							.println("ADMIN OPTIONS: Press '1' to send message to all clients, press '2' to send an image, press '3' to list the images so far from chat.txt, press '4' to delete a message from chat.txt.");
				} else {
					System.out
							.println("Press '1' to send message, '2' for image.");
				}

				answer = scan.nextLine();

				if (isAdmin) {
					if (answer.equals("1")) {
						System.out.print("Enter your message: ");

						if (scan.hasNext()) {
							message = scan.nextLine();
							try {
								handleChat(message);
							} catch (IOException e) {
								e.printStackTrace();
							}
						}
					} else if (answer.equals("2")) {
						System.out
								.print("Please enter a file path (Recommend 'linux.png'): ");
						if (scan.hasNext()) {
							message = scan.nextLine();
							try {
								File f = new File(message);
								if (f.exists() && f.canRead()) {
									byte[] image = new byte[30000];
									FileInputStream fis = new FileInputStream(
											message);
									fis.read(image);
									handleChat("Sending image...");
									handleChat(image);
									fis.close();
								}
							} catch (IOException e) {
								e.printStackTrace();
							}
						} else {
							System.out.println("Invalid input, try again.");
						}
					} else if (answer.equals("3")) {
						try {
							handleChat("sendAdminChatLogs");
						} catch (IOException e) {
							e.printStackTrace();
						}
					} else if (answer.equals("4")) {
						// TODO implement deleting line
					} else {
						System.out.println("Invalid input, try again.");
					}

				} else if (answer.equals("1")) {
					System.out.print("Enter your message: ");

					if (scan.hasNext()) {
						message = scan.nextLine();
						try {
							handleChat(message);
						} catch (IOException e) {
							e.printStackTrace();
						}
					}//sending image
				} else if (answer.equals("2")) {
					System.out
							.print("Please enter a file path (Recommend 'linux.png'): ");
					if (scan.hasNext()) {
						message = scan.nextLine();
						try {
							File f = new File(message);
							if (f.exists() && f.canRead()) {
								byte[] image = new byte[30000];
								FileInputStream fis = new FileInputStream(
										message);
								fis.read(image);
								handleChat("Sending image...");
								handleChat(image);
								fis.close();
							}
						} catch (IOException e) {
							e.printStackTrace();
						}
					} else {
						System.out.println("Invalid input, try again.");
					}
				}

				answer = null;
			}

		}

		//handle text messages
		public synchronized void handleChat(String message) throws IOException {
			message = username + ": " + message + ":endMessage";
			streamOut.write(encodeMessage(message));
			streamOut.flush();
		}

		//handle image messages
		public synchronized void handleChat(byte[] image) throws IOException {
			String message = username + ": :beginImage";
			streamOut.write(encodeMessage(message));
			streamOut.write(image);
			String end = ":endImage";
			streamOut.write(end.getBytes());
			streamOut.flush();
		}

		//encode text messages for sending
		public byte[] encodeMessage(String message) {
			byte[] encoded = message.getBytes();
			for (int i = 0; i < message.length(); i++) {
				encoded[i] = (byte) (encoded[i] ^ (byte) 240);
			}
			return encoded;
		}

		// public void displayChatLog(){
		// try {
		//
		// } catch (IOException e) {
		// e.printStackTrace();
		// }
		// }

		//encode image byte arrays for sending
		public String encodeImage(byte[] image) {
			String finalAnswer = "", chunk = "", piece = "";
			int counter = 0;
			for (int i = 0; i < image.length; i++) {
				chunk += String.format("%8s",
						Integer.toBinaryString(image[i] & 0xFF)).replace(' ',
						'0');
				counter++;
				if (counter == 3) {
					for (int j = 0; j < 4; j++) {
						piece = chunk.substring(0, 6);
						chunk = chunk.substring(6);
						piece += "00";
						finalAnswer += piece;
					}
					counter = 0;
					chunk = "";
				} else if ((counter == 1) && (i == (image.length - 1))) {
					chunk += "0000000000000000";
					for (int j = 0; j < 4; j++) {
						piece = chunk.substring(0, 6);
						chunk = chunk.substring(6);
						piece += "00";
						finalAnswer += piece;
					}
				} else if ((counter == 2) && (i == (image.length - 1))) {
					chunk += "00000000";
					for (int j = 0; j < 4; j++) {
						piece = chunk.substring(0, 6);
						chunk = chunk.substring(6);
						piece += "00";
						finalAnswer += piece;
					}
				}
			}
			return finalAnswer;
		}

		//decode encrypted images
		public byte[] decodeImage(byte[] b) {
			String chat = "";
			byte[] answer = new byte[b.length];
			for (int i = 0; i < b.length - 1; i++) {
				answer[i] = (byte) ((b[i] & 0b00000011) | (b[i + 1] >> 6));
			}
			return answer;
		}

		public void start() throws IOException {
			run();
		}

		public void stop() {
			// TODO

		}

	}
}
