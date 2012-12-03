/**
* Appcelerator Titanium Mobile
* This is generated code. Do not modify. Your changes *will* be lost.
* Generated code is Copyright (c) 2009-2011 by Appcelerator, Inc.
* All Rights Reserved.
*/
#import <Foundation/Foundation.h>
#import "TiUtils.h"
#import "ApplicationDefaults.h"
 
@implementation ApplicationDefaults
  
+ (NSMutableDictionary*) copyDefaults
{
    NSMutableDictionary * _property = [[NSMutableDictionary alloc] init];

    [_property setObject:[TiUtils stringValue:@"Ojbnkxths8utIx5nMsFNOg7ZQlCjnVqd"] forKey:@"acs-oauth-secret-production"];
    [_property setObject:[TiUtils stringValue:@"duuM9WLOWMGbfVDUGd5kBhBeU8v3JrjT"] forKey:@"acs-oauth-key-production"];
    [_property setObject:[TiUtils stringValue:@"jdCRsVLz51hLjigHRTGjhGvkg6Gdi2GE"] forKey:@"acs-api-key-production"];
    [_property setObject:[TiUtils stringValue:@"H4ROUd8CCqlNiNaPgbxgNkV46gNbpWFg"] forKey:@"acs-oauth-secret-development"];
    [_property setObject:[TiUtils stringValue:@"IBrAHlWhq8FSqPsAjxXvN2XWKxEsP8Kp"] forKey:@"acs-oauth-key-development"];
    [_property setObject:[TiUtils stringValue:@"E77Wo8XF3KUhk8c9Qnt3BmtlvIW7QmuV"] forKey:@"acs-api-key-development"];
    [_property setObject:[TiUtils stringValue:@"system"] forKey:@"ti.ui.defaultunit"];

    return _property;
}
@end
