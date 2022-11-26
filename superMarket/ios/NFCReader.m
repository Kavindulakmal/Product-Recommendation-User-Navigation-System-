//
//  NFCReader.m
//  silicaApp
//
//  Created by Isuru Dharmadasa on 2021-09-11.
//

#import "React/RCTBridgeModule.h"

@interface RCT_EXTERN_MODULE(NFCReader, NSObject)

RCT_EXTERN_METHOD(beginScanning: (RCTResponseSenderBlock)callback)

@end
