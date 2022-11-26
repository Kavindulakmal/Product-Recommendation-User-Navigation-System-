//
//  NFCReader.swift
//  silicaApp
//
//  Created by Isuru Dharmadasa on 2021-09-11.
//

import Foundation
import CoreNFC
import UIKit
import os.log

@available(iOS 13.0, *)
@objc(NFCReader)
class NFCReader: UIViewController, NFCTagReaderSessionDelegate {
  private let UNKNOWN_UID = "UNKNOWN_UID";
  private let UNKNOWN_ECC_SIG = "UNKNOWN_ECC_SIG";
  
  private var uid = "UNKNOWN_UID"
  private var ecc_sig = "UNKNOWN_ECC_SIG"
  private var session_cancelled = true
  
  private var session: NFCTagReaderSession?
  private var rnCallback: RCTResponseSenderBlock?
  
  private let logger = OSLog(subsystem: Bundle.main.bundleIdentifier!, category: "NFCReader")
  
  @objc
  func beginScanning(_ callback: @escaping RCTResponseSenderBlock) {
    self.rnCallback =  callback
    guard NFCTagReaderSession.readingAvailable else {
      let alertController = UIAlertController(
        title: "Scanning Not Supported",
        message: "This device doesn't support tag scanning.",
        preferredStyle: .alert
      )
      alertController.addAction(UIAlertAction(title: "OK", style: .default, handler: nil))
      self.present(alertController, animated: true, completion: nil)
      os_log("this device doesn't support tag scanning", type: .info)
      return
    }
    
    session = NFCTagReaderSession(pollingOption: .iso14443, delegate: self)
    session?.alertMessage = "Hold your iPhone near the item to learn more about it."
    session?.begin()
  }
  
  func tagReaderSessionDidBecomeActive(_ session: NFCTagReaderSession) {
    os_log("NFC Reading session active", type: .info)
  }
  
  func tagReaderSession(_ session: NFCTagReaderSession, didInvalidateWithError error: Error) {
    if let readerError = error as? NFCReaderError {
      // Show an alert when the invalidation reason is not because of a
      // successful read during a single-tag read session, or because the
      // user canceled a multiple-tag read session from the UI or
      // programmatically using the invalidate method call.
      if (readerError.code != .readerSessionInvalidationErrorFirstNDEFTagRead) && (readerError.code != .readerSessionInvalidationErrorUserCanceled) {
        let alertController = UIAlertController(
          title: "Session Invalidated",
          message: error.localizedDescription,
          preferredStyle: .alert
        )
        alertController.addAction(UIAlertAction(title: "OK", style: .default, handler: nil))
        self.present(alertController, animated: true, completion: nil)
        os_log("NFC Reading session invalidated with error %@", type: .error, error.localizedDescription)
      }
    }
    os_log("NFC Tag ECC Signature: %@", type: .info, self.ecc_sig)
    os_log("NFC Tag UID: %@", type: .info, self.uid)
    
    os_log("NFC Reading session ended", type: .info)
    // To read new tags, a new session instance is required.
    self.session = nil
    // Call RN Callback and reset it
    self.rnCallback!([self.uid, self.ecc_sig, self.session_cancelled])
    self.rnCallback = nil
    self.uid = self.UNKNOWN_UID
    self.ecc_sig = self.UNKNOWN_ECC_SIG
    self.session_cancelled = true
  }
  
  func tagReaderSession(_ session: NFCTagReaderSession, didDetect tags: [NFCTag]) {
    os_log("Connecting to NFC Tag", type: .info)
    self.session_cancelled = false
    if tags.count > 1 {
      session.invalidate(errorMessage: "More than 1 tag is detected, please remove all tags and try again.")
      return
    }
    
    let tag = tags.first!
    session.connect(to: tag) { (error) in
      if nil != error {
        session.invalidate(errorMessage: "Unable to connect to tag.")
        os_log("NFC Reading session invalidated with error %@", type: .error, error! as CVarArg)
        return
      }
      if case let .miFare(sTag) = tag{
        var tagECCSig = "";
        let miFareCommandByteArray: [UInt8] = [0x3c, 0x00]
        let commandMifare = Data(bytes: miFareCommandByteArray, count: miFareCommandByteArray.count)
        sTag.sendMiFareCommand(commandPacket: commandMifare) { (response: Data, error: Error?) in
          if nil != error {
            session.invalidate(errorMessage: "Error reading tag signature")
            os_log("Error sending MiFare command: %@", type: .error, error! as CVarArg)
            return
          }
          tagECCSig = response.map{ String(format: "%.2hhx", $0)}.joined()
          self.ecc_sig = tagECCSig
        }
        
        self.uid = sTag.identifier.map{ String(format: "%.2hhx", $0)}.joined()
        
        session.alertMessage = "Item scanned successfully."
        session.invalidate()
      }
    }
  }
  
  @objc
  static func requiresMainQueueSetup() -> Bool {
    return true
  }
  
}
